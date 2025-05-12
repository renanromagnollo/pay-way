'use client'

import { useCallback, useState } from "react"

export default function DonatePage() {

  const [amount, setAmount] = useState(10)
  const [loading, setLoading] = useState(false)

  const handleDonate = useCallback(async () => {
    setLoading(true)
    const res = await fetch('/api/stripe/donate', {
      method: 'POST',
      body: JSON.stringify({ amount }),
      headers: { 'Content-Type': 'application/json' }
    })

    const data = await res.json()
    if (data.url) window.location.href = data.url
    else alert('Erro ao iniciar pagamento')

    setLoading(false)
  }, [amount])

  return (
    <div className="max-w-md mx-auto mt-20 text-center">
      <h1 className="text-2xl font-bold mb-4">Faça uma doação 💖</h1>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className="border p-2 rounded w-full mb-4"
        placeholder="Valor em USD"
      />
      <button
        onClick={handleDonate}
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        disabled={loading}
      >
        {loading ? 'Redirecionando...' : 'Doar agora'}
      </button>
    </div>
  )
}