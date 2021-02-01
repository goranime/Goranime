const axios = require('axios').default

class QuoteApiController {
  static getQuote (req, res) {
    let quoteUrl = 'https://animechanapi.xyz/api/quotes/random'
    axios.get(quoteUrl)
      .then(result => {
        let aniQuote = result.aniQuote.data.forEach(el => {
          res.status(200).json({
            "quote": el.quote,
            "character": el.character,
            "anime": el.anime
          })
        })
      })
      .catch(err => {
        res.send(err)
      })
  }
}

module.exports = QuoteApiController;