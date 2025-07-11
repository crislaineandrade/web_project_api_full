import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
const __dirname = import.meta.dirname

// try {
//   fs.readFile(path.join(__dirname,'..', 'logs/request.log'), (error, data)=>
// {
//   if (error) {
//     fs.writeFileSync(path.join(__dirname,'..', 'logs/request.log'), "")
//   }

// })

// }catch(error) {
//   fs.writeFileSync(path.join(__dirname,'..', 'logs/request.log'), "")

// }
const requestLogStream = fs.createWriteStream(path.join(__dirname,'..', 'logs/request.log'), { flags: 'a', emitClose:false });



export const requestLogger = morgan((tokens, req, res) => {
  return JSON.stringify({
    method: tokens.method(req, res),
    url: tokens.url(req, res),
    status: tokens.status(req, res),
    contentLength: tokens.res(req, res, 'content-length'),
    responseTime: `${tokens['response-time'](req, res)} ms`,
    date: new Date().toISOString()
  });
}, {
  stream: requestLogStream,
});


// Middleware para erros
export const errorLogger = (err, req, res, next) => {
  const errorData = {
    date: new Date().toISOString(),
    method: req.method,
    url: req.originalUrl,
    error: {
      message: err.message,
      statusCode: err.statusCode || 500,
      stack: err.stack,
    },
  };
  fs.appendFile('./logs/error.log', JSON.stringify(errorData) + '\n', (error) => {
    if (error) {
      console.error('Erro ao salvar error.log', error);
    }
  });
  next(err);
};