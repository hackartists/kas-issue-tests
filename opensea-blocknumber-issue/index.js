const fs = require('fs')
const Caver = require('caver-js')
const ak = process.env.KAS_ACCESS_KEY_ID
const sk = process.env.KAS_SECRET_KEY
const endpoint = `https://${ak}:${sk}@node-api.klaytnapi.com/v1/klaytn?chain-id=8217`
console.log(endpoint)
const caver = new Caver(endpoint)
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

function now() {
    return (new Date(Date.now()).toISOString())
}
async function test()  {
    console.log(`start: ${now()}`)
    var prev = 0
    while(true) {
        const ret = await caver.rpc.klay.getBlockByNumber('latest')
        const num = parseInt(ret.totalBlockScore, 16)
        if (prev+10 < num || prev > num) {
            console.log(`${now()}: previous number: ${prev}, current number: ${num}`)
        }
        prev = num
        await delay(200)
    }
}

test()
