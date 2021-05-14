const stocksApi = require('../config/stocksAxios')

const searchStock = async (req, res) => {
    const { symbol } = req.params

    if (!symbol) {
        res.status(400).send('Bad Request No Params')
    }

    try {
        const { data } = await stocksApi.get(`/stock/v2/get-summary?symbol=${symbol}`);
        if (data.symbol) {

            let CEO = ""
            data.insiderTransactions.transactions.find(each=>{
                if(each.filerRelation.includes("Chief Executive Officer")){
                    CEO = each.filerName
                }
            })
            if(CEO=="")
            data.insiderHolders.holders.find(each=>{
                if(each.relation.includes("Chief Executive Officer")){
                    CEO = each.name
                }
            })
            const result = {
                symbol: data.symbol,
                shortName: data.price.shortName,
                longName: data.price.longName,
                summaryProfile: data.summaryProfile,
                ceo: CEO,
                price: {
                    value: data.price.regularMarketPreviousClose.raw,
                    currency: data.price.currency,
                    currencySymbol: data.price.currencySymbol,
                    marketCap: data.price.marketCap.fmt,
                    avgVolume: data.price.averageDailyVolume3Month.fmt
                }
            }
            return res.json(result)
        }

        else return res.status(404).send("No Results.")
    }
    catch (err) {
        console.log(err)
        return res.status(400).json(err.response && err.response.data || err || "some unexpected error occured")
    }


}

const autoComplete = async (req, res) => {
    const { symbol } = req.params

    if (!symbol) {
        res.status(400).send('Bad Request No Params')
    }

    try {
        const { data } = await stocksApi.get(`/auto-complete?q=${symbol}`);
        const result = data.quotes.map(each => {
            return {
                symbol: each.symbol,
                shortname: each.shortname,
                longname: each.longname

            }
        })
        return res.json(result)
    }
    catch (err) {
        console.log(err)
        return res.status(400).json(err.response && err.response.data || err || "some unexpected error occured")
    }


}


const getChart = async (req, res) => {
    const { symbol } = req.params

   
    if (!symbol) {
        res.status(400).send('something went wrong')
    }

    try {
        const { data } = await stocksApi.get(`/stock/v2/get-chart?symbol=${symbol}&interval=1d&range=1y`);
        if (!data.chart.error) {
            const result = {
                symbol: data.chart.result[0].meta.symbol,
                timestamp: data.chart.result[0].timestamp,
                value: data.chart.result[0].indicators.quote[0].close.map(each => {
                    if(each)
                    return each.toFixed(2)
                    else return each
                })
            }
            return res.json(result)
        }
        else return res.status(400).json(data.chart.error)
    }
    catch (err) {
        console.log(err)
        return res.status(400).json(err.response && err.response.data || err || "some unexpected error occured")
    }


}


exports.searchStock = searchStock;
exports.autoComplete = autoComplete;
exports.getChart = getChart;