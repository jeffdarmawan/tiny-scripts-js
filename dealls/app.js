// old version: read from json file
// var json = require('./dealls_loker.json');
// console.log("number of jobs: ", json.length);
// distinct_companies = [... new Set(json.map(item => item.company.name))];
// console.log("number of companies: ", distinct_companies.length);
// console.log("companies: ", distinct_companies);

let number_of_jobs = 0
let distinct_companies = []
function fetch_data(page, limit) {
    console.log("fetching data. page: ", page)

    let url = "https://api.sejutacita.id/v1/banner/shelf/660e4419ca1f610013f990e6/item?page=" + page + "&limit=" + limit + "&sortBy=asc&sortParam=createdAt"
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(response => {
            number_of_jobs += response.data.result.docs.length;
            distinct_companies = [... new Set(response.data.result.docs.map(item => item.company.name).concat(distinct_companies))];

            if (response.data.result.page != response.data.result.totalPages) {
                fetch_data(page + 1, limit);
            } else {
                console.log("number of jobs: ", number_of_jobs);
                console.log("number of companies: ", distinct_companies.length);
                console.log("companies: ", distinct_companies);
            }
        })
        .catch(error => {
            console.error

            ('Error:', error);
        });
}

fetch_data(1,20);