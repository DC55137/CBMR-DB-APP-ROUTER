// app/rates/page.tsx
import { rates } from "@/data/rates";

export default function RatesPage() {
  return (
    <div className="bg-main-1 text-main-12 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Our Rates</h1>
        <div className="bg-main-2 rounded-lg shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-main-4">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">
                  Price
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-main-5">
              {rates.map((rate, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-main-3" : "bg-main-2"}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    {rate.service}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    ${rate.price.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
