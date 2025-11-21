'use server'; // Mark the file as a Server Component and enable Server Actions
 
 
export default async function ServerDataFetcher() {
    const api_url = 'http://localhost:8081/api/v1/recursos'
    const response = await fetch(api_url, { cache: 'no-store' })
    const data = await response.json()
    const person_list = data._embedded.personList
 
 
    let content = []
    for (const item of person_list) {
        // console.log(`Name: ${item.name}, Age: ${item.age}`);
        content.push(<li key={item.id}>Id: {item.id}, Name: {item.name}, Age: {item.age}</li>)
    }
    return <>{content}</>
}