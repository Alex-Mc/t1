import { scrapeTopAiringAnime} from '../../lib/anime_parser.js';
import initMiddleware from '../../lib/init-middleware.js';
import Cors from 'cors';

const cors = initMiddleware(
    // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
    Cors({
        origin: "*",
        credentails: true,
        optionSuccessStatus: 200
    })
  )

export default async function handler(req, res) {
    await cors(req, res);
    
    try {
        const page = req.query.page

        const data = await scrapeTopAiringAnime({ page: page })

        res.status(200).json(data)

    } catch (err) {
        res.status(500).send({
            status: 500,
            error: "Internal Error",
            message: err,
        })
    }
  };