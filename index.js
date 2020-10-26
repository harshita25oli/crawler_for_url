const axios = require("axios");
const cheerio = require("cheerio");
const fs=require('fs');

async function main(){

    const html= await axios.get('http://127.0.0.1:5500/view/extable.html');
    const $= await cheerio.load(html.data);
     const scraperow=[];
     const headers=[];

    $("body > table > tbody > tr").each((index,element) => {
        if(index===0){
            const ths=$(element).find("th");
             ths.each((index,element) => {
                 headers.push($(element).text().toLocaleLowerCase());
             });


return true;
            
        }
        const tds=$(element).find("td");
        const objectrow={};
        tds.each((index, elements)=>{
          objectrow[headers[index]]=$(elements).text();
          scraperow.push(objectrow);
        });

       // const tds=$(element).find("td");
        //const company=$(tds[0]).text();
        //const contact=$(tds[1]).text();
        //const country=$(tds[2]).text();

        //const scrapeobj={company, contact, country};
        //scraperow.push(scrapeobj);

    });
    console.log(scraperow);
}

main();