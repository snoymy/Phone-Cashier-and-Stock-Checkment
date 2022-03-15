export default function useFetchpostItems(data) {
    return new Promise(async (resolve, reject)=>{
        const url = 'http://385a-124-120-249-140.ngrok.io/api/v1/company/addCompany';

        const res = await fetch(url, {
            method: 'POST', 
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).catch(err => console.log(err))

        let items = []
        try{
            items = await res.json();
            console.log(items)
            resolve(items)
        }
        catch (error) {
            console.error(error);
            reject([])
        }
    })
}
