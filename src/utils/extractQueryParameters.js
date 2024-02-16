export default function extractQueryParameters(query){
  return query.substr(1).split('&').reduce((result, item) => {
    const [key, value] = item.split('=')
    
    result[key] = value

    return result
  }, {})
}