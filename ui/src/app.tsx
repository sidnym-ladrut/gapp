import React, { useEffect, useState } from 'react';
import Urbit from '@urbit/http-api';
import { Charge, Charges, ChargeUpdateInitial, scryCharges } from '@urbit/api';

const api = new Urbit('', '', window.desk);
api.ship = window.ship;

export default function App() {
  const [apps, setApps] = useState<Charges>();

  useEffect(() => {
    async function init() {
      const charges = (await api.scry<ChargeUpdateInitial>(scryCharges)).initial;
      setApps(charges);
    }
    init();
  }, []);

  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="max-w-md space-y-6 py-20">
        <h1 className="text-3xl font-bold">Urbit Apps on ~{api.ship}:</h1>
        {apps && (
          <ul className="space-y-4">
            {Object.entries(apps).map(([desk, app]: [string, Charge]) => (
              <li key={desk} className="flex items-center space-x-3 text-sm leading-tight">
                <div className="flex-1 text-black">
                  <strong>{app.title || desk}</strong>
                  {app.info && <p>{app.info}</p>}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
