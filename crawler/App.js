const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const cors = require('cors');
const axios = require('axios');

//mongodb
const Model = require('./Model');

// set up server
const app = express();
const port = 5000;

app.use(cors);
app.use(express.json());

//determine how many page need to be scraped.
function get_page(num){
    const url = 'https://ca.indeed.com/jobs?q=Software%20Developer&l=Canada&start=';
    var urls = [];
    
    for (var i = 0; i < num*10; i+=10){
        urls.push(url + i);
    }
    return urls;
}

//scrape each job post
async function crawl_each_post(url){
    var list = [];
    var query;
    axios.get(url).then((res) => {
        try {
            const $ = cheerio.load(res.data);
            // get job post links from each page
            $('a.tapItem').each((i, el) => {
                const link = $(el).attr('href');
                list.push('https://ca.indeed.com' + link);
            });

            for (var j = 0; j < list.length; j++) {
                var post = list[j];
                axios.get(post).then((res) => {
                    try {
                        const $ = cheerio.load(res.data);
                        // get detail info from each job post.
                        var jobtitle = $('h1.jobsearch-JobInfoHeader-title').text();

                        if (jobtitle === '') {
                            return;
                        }

                        var company = $('div.jobsearch-InlineCompanyRating div').text();
                        var companylink = $('div.jobsearch-InlineCompanyRating a').attr('href');

                        var companyIcon = $('img.jobsearch-JobInfoHeader-logo').attr('src');

                        var worktype = $('div.jobsearch-JobInfoHeader-subtitle div:nth-child(3)').text();
                        var location = '';
                        if (worktype === '') {
                            location = $('div.jobsearch-JobInfoHeader-subtitle div:not([class])').text().toString();
                        } else {
                            location = $('div.jobsearch-JobInfoHeader-subtitle div:nth-child(2)').text().toString();
                        }

                        var jobcondition = $('div.jobsearch-JobMetadataHeader-item').text();

                        var jobdescription = $('#jobDescriptionText').text();

                        var postdate = $('.jobsearch-JobMetadataFooter div:not([class])').text();
                        postdate = postdate.replace("Report job", "");

                        const deleted = false;

                        var model = {
                            jobtitle: jobtitle.trim().split('\n') || '',
                            company: company.trim().split('\n') || '',
                            companylink: companylink || '',
                            companyIcon: companyIcon || '',
                            worktype: worktype.trim().split('\n') || '',
                            location: location.trim().split('\n') || '',
                            jobcondition: jobcondition.trim().split('\n') || '',
                            jobdescription: jobdescription.trim() || '',
                            postdate: postdate.trim().split('\n') || '',
                            
                            deleted: deleted
                        };
                        query = new Model(model);

                        // save the job post into mongodb
                        query.save(function (err) {
                            if (err) {
                                console.log('Database err saving: ' + err);
                            }
                        });

                    } catch (err) {
                        console.error('error message: ' + err);
                    }
                });
            }
            console.log("Page finished");


        } catch (err) {
            console.error('error message: ' + err);
        }
    });
}


// main function to run the crawler
function main() {
    var Pages = [];
    //here to decide how many pages we need.
    Pages = get_page(50);
    
    for (var counter = 0; counter < Pages.length; counter++) {
        crawl_each_post(Pages[counter]);
    }
    console.log('Scraping Finished');
}

if (require.main === module) {
    main();
}

// start listen to the server
app.listen(port, function() {
    console.log('app listening on port ' + port);
})