import RestApis from './RestApis';
const OnlineService={
    online: RestApis.onlineservice +'/online/findallonline',
    offline: RestApis.onlineservice +'/online/findalloffline',
   
}
export default OnlineService;
