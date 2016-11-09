import express from 'express';
import cors from 'cors';

const app = express();

function tranformFIO(prmArray) {	
	const badmsg = 'Invalid fullname';
	try {
		var re = /^([A-ZА-ЯЁ][a-zа-яёó]+)( [A-ZА-ЯЁ][a-zа-яёó]+)?( [A-ZА-ЯЁ][a-zа-яёó]+)?$/;
		var abbrFIO = prmArray['fullname'].match(re);
		var name1 = ''; 
		var name2 = '';
		var name3 = '';
		if (!!abbrFIO[3]) {
			name1 = abbrFIO[3].replace(/^\s*/,'').replace(/\s*$/,'');	
			name2 = ' ' + abbrFIO[1].replace(/^\s*/,'').replace(/\s*$/,'')[0] + '.';
			name3 = ' ' + abbrFIO[2].replace(/^\s*/,'').replace(/\s*$/,'')[0] + '.'
		} else if (!!abbrFIO[2]) {
			name1 = abbrFIO[2].replace(/^\s*/,'').replace(/\s*$/,'');
			name2 = ' ' +abbrFIO[1].replace(/^\s*/,'').replace(/\s*$/,'')[0] + '.';			
		} else {
			name1 = abbrFIO[1].replace(/^\s*/,'').replace(/\s*$/,'');		
		}
		

		abbrFIO = name1 + name2 + name3;

	} catch (e) {
		return badmsg;
	}
	
	return abbrFIO;
}



app.use(cors());
app.get('/task2b', (req, res) => {
  
  res.send(tranformFIO(req.query));


});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
