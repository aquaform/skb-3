import express from 'express';
import cors from 'cors';

const app = express();

function calculate(query) {	
	const reA = /((\-)?\d+(\.\d+)?)/;
	try {
		var a = query['a'].match(reA)[1];
	} catch(e) {		
		return 0;
	}		
	const reB = /((\-)?\d+(\.\d+)?)/;	
	try {
		var b = (query['b'].match(reB)[1]);
	} catch (e) {
		return a;
	}
	return Number(a) + Number(b);	
};

app.use(cors());
app.get('/task2a', (req, res) => {	
	var sum = (+req.query.a || 0) + (+req.query.b || 0);
	res.send(''+sum);
});


app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
