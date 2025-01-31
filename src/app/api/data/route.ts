import { TNormalize } from "@/app/types/data.types";

export async function GET() {
    const group = new groupData('https://dummyjson.com/users')
    const data = await group.getData()
    return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
    })
}

class groupData {
    constructor(url: string) {
        this.url = url
    }
    private url: string;
    async getData() {
        const rawData = await this.fetchData()
        return this.normalizeUserData(rawData)
    }

    private async fetchData() {
        try {
            const res = await fetch(this.url)
            const data = await res.json();
            return data.users
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    private initData() {
        return {
            male: 0,
            female: 0,
            ageRange: '99999-0',
            hair: {},
            addressUser: {}
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private normalizeUserData(users: any[]): TNormalize {
        const normalizedData: TNormalize = {}
        for (const user of users) {
            const department = user.company.department
            normalizedData[department] = normalizedData[department] || this.initData()
            normalizedData[department].male += user.gender === 'male' ? 1 : 0
            normalizedData[department].female += user.gender === 'female' ? 1 : 0
            normalizedData[department].addressUser[`${user.firstName}${user.lastName}`] = `${user.address.postalCode}`

            if (!normalizedData[department].hair?.[user.hair.color]) {
                normalizedData[department].hair[user.hair.color] = 0
            }

            normalizedData[department].hair[user.hair.color] += 1
            const ages = normalizedData[department].ageRange.split('-')
            const min = Math.min(user.age, +ages[0])
            const max = Math.max(user.age, +ages[1])
            normalizedData[department].ageRange = `${min}-${max}`
        }

        return normalizedData;
    }
}