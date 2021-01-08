const axios = require('axios').default

class QuoteApiController {
  static getQuote (req, res) {
    let quoteUrl = 'https://animechanapi.xyz/api/quotes/random'
    axios.get(quoteUrl)
      .then(result => {
        let aniQuote = result.aniQuote.data
        res.status(200).json({
          "quote": aniQuote.quote,
          "character": aniQuote.character,
          "anime": aniQuote.anime
        })
      })
      .catch(err => {
        res.send(err)
      })
  }
}

module.exports = QuoteApiController;