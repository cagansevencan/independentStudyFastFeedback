import pino from 'pino'
import { logflarePinoVercel } from 'pino-logflare'

// create pino-logflare console stream for serverless functions and send function for browser logs
const { stream, send } = logflarePinoVercel({
    apiKey: process.env.LOGFLARE_API_KEY,
    sourceToken: process.env.LOGFLARE_SOURCE_TOKEN
});

// create pino loggger
const logger = pino({
    browser: {
        transmit: {
            send: send,
        }
    },
    level: "debug",
    base: {
        processes_str: JSON.stringify(process.versions),
        revision: process.env.VERCEL_GITHUB_COMMIT_SHA,
    },
}, stream);


const formatObjectKeys = headers => {

    const keyValues = {}
    Object.keys(headers).map(key => {
        const newKey = key.replace(/-/g, "_");
        keyValues[newKey] = headers[key]
    });

    return keyValues
}

export { logger, formatObjectKeys }
