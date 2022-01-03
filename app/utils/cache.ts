import Cache from 'node-cache'

const cache = new Cache({ stdTTL: 60 })

export default cache
