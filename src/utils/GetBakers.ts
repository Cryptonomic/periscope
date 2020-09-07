export const getBaker = async function(pkh: string) {
    return new Promise((resolve, reject) => {
        fetch("https://api.baking-bad.org/v2/bakers/" + pkh).then(async apiData => {
            if (apiData.status !== 200) {
                resolve(pkh);
            }
            let jsonData = await apiData.json()
            resolve(jsonData["name"]);
        }).catch((error) => {
            resolve(pkh);
        })
    })
}