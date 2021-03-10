// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import p5 from 'node-p5'
import jwt from 'jsonwebtoken'

function sketch(p) {
  p.setup = () => {
      let canvas = p.createCanvas(200, 200);
      setTimeout(() => {
          p.saveCanvas(canvas, 'public/myCanvasCIAO', 'png').then(filename => {
              console.log(`saved the canvas as ${filename}`);
          });
      }, 100);
  }
  p.draw = () => {
      p.background(50);
      p.text('hello world!', 50, 100);
  }
}

export default (req, res) => {
  try {
    console.log("REQ", req.headers, req.headers.authentication);
    var decoded = jwt.verify(req.headers.authentication , 'paperino', { algorithms : ["HS256", "HS384"] , ignoreExpiration : true });
    console.log("DECODED", decoded);
  } catch(err) {
    console.warn("Errore");
  }
  res.statusCode = 200
  //let p5Instance = p5.createSketch(sketch);
  res.json({ name: 'John Doe' })
}
