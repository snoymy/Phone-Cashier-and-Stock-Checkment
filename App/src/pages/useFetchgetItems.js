export default function useFetchgetItems() {
    return new Promise(async (resolve, reject)=>{
        const url = 'http://385a-124-120-249-140.ngrok.io/api/v1/company/getCompanies';

        const res = await fetch(url).catch(err => console.log(err))
        let items = []
        try{
            items = await res.json();
            resolve(items)
        }
        catch (error) {
            console.error(error);
            reject([])
        }
    })
}
