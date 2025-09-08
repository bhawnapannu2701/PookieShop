import { useEffect, useState } from 'react'
import { getProducts } from '../api'
import ProductCard from '../components/ProductCard.jsx'
import { useLocale } from '../context/LocaleContext.jsx'

function CardSkeleton(){
  return (
    <div className="card">
      <div className="skeleton" />
      <div className="info">
        <div className="skeleton" style={{height:14, margin:'8px 0', borderRadius:6}}/>
        <div className="skeleton" style={{height:14, width:80, borderRadius:6}}/>
      </div>
    </div>
  )
}

export default function ShopAll(){
  const { t } = useLocale()
  const [data,setData] = useState(null)
  const [error,setError] = useState(null)

  useEffect(()=>{
    setData(null); setError(null)
    getProducts(0, 48).then(setData).catch(setError)
  },[])

  return (
    <div className="page">
      <h1>🍯 {t('headings.shopAll')}</h1>
      {error && <p style={{color:'crimson'}}>Failed to load products.</p>}
      {!data && (
        <div className="card-grid">
          {Array.from({length:12}).map((_,i)=><CardSkeleton key={i}/>)}
        </div>
      )}
      {data && (
        <div className="card-grid">
          {data.map(p => <ProductCard key={p.id} p={p} />)}
        </div>
      )}
    </div>
  )
}
