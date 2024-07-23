import { Job } from "@prisma/client";

function leadMessage(job: Job) {
  return `Hey ${job.name},
  This is Daniel from CBMR (Chris Board Metal Roofing). 
  Just looking to follow up on the lead we've just recently accepted on 
  hipages. Could you please send through the address for the job and we 
  will work to get you a quote back as soon as possible.
  Regards, Daniel
  CBMR`;
}

function cancelJob(job: { name: string; address: string }) {
  return `Hey ${job.name},
  This is Daniel from CBMR (Chris Board Metal Roofing). Thank you for 
  reaching out to CBMR through our website. Unfortunately, due to the high 
  workload we are currently experiencing, we won’t be able to attend 
  the work order at: 
  ${job.address}
  Thank you again and good luck with your project. 
  Regards, Daniel
  CBMR`;
}

function onlineMeasureUpQuote(job: {
  name: string;
  address: string;
  email: string;
}) {
  return `Hey ${job.name},
  This is Daniel from CBMR (Chris Board Metal Roofing). 
  Thank you for the opportunity to quote the job at: 
  ${job.address}
  The satellite imagery accessed through Queensland Globe, provided CBMR with all the necessary measurement to create the quote.
  We have finalised the quote and sent it to: 
  ${job.email}
  If you are happy with this price, we will be happy to organise a site meeting between yourself and Chris to clarify any concerns.  
  Feel free to check out our website for more information about our company. 
  www.cbroofing.com.au 
  If you have any questions, please don't hesitate to ask. We look forward to hearing from you 
  shortly  
  Regards, Daniel
  CBMR`;
}

function drawingMeasureUpQuote(job: {
  name: string;
  address: string;
  email: string;
}) {
  return `Hey ${job.name},
  This is Daniel from CBMR (Chris Board Metal Roofing). 
  Thank you for the opportunity to quote the job at: 
  ${job.address}
  We have finalised the quote and sent it to: 
  ${job.email}
  Feel free to check out our website for more information about our company. 
  www.cbroofing.com.au 
  If you have any questions, please don't hesitate to ask. We look forward to hearing from you 
  shortly  
  Regards, Daniel
  CBMR`;
}

// function quoteEmail(job) {}

export { leadMessage, cancelJob, onlineMeasureUpQuote, drawingMeasureUpQuote };
