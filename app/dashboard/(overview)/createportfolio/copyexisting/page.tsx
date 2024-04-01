import { impactportfolios } from "@/app/lib/placeholder-data"
import Form from "@/app/ui/dashboard/create-form";
import { fetchImpactPortfolios } from "@/app/lib/data";

export default async function Page() {
    const impactPortfolios = await fetchImpactPortfolios();
    return(
        <div>
            <Form impactPortfolios={impactPortfolios} />
        </div>
    );
    
}