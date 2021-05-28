'use strict';

const axios = require('axios');

function getJobs(request, response) {
  const url=`https://remotive.io/api/remote-jobs`;
  axios
    .get(url)
    .then(res => {
      const finalJobArray = res.data.jobs.map(job => new Job(job));
      response.status(200).send(finalJobArray);
    })
    .catch(err => {
      console.error('error from superagent', err);
      response.status(500).send(`server error ${err}`);
    })
}

class Job {
  constructor(obj) {
    this.name = obj.title;
    this.company_logo_url = obj.company_logo_url;
    this.description = obj.description;
    this.salary = obj.salary;
    this.company_name = obj.company_name;
    this.url = obj.url;
  }
}

module.exports = getJobs;
