/**
 * Seçilen bölümü (lib/bolum.ts) ve zorunlu animasyon modunu ilk boyamadan önce
 * <html data-bolum data-hareket> özniteliklerine geri yükleyen satır içi betik.
 * Sunucu bileşeni olan app/layout.tsx kullandığı için istemci kancalarından ayrı dosyada.
 */
export const BOLUM_KEY = "salon-bolum";
export const HAREKET_KEY = "salon-hareket";

export const bolumScript = `try{var d=document.documentElement,u=new URLSearchParams(location.search),qB=u.get("bolum"),b=qB||localStorage.getItem("${BOLUM_KEY}");if(qB==="secim"){localStorage.removeItem("${BOLUM_KEY}");b=null}else if(qB==="kuafor"||qB==="guzellik"){localStorage.setItem("${BOLUM_KEY}",qB)}if(b==="kuafor"||b==="guzellik")d.dataset.bolum=b;var qH=u.get("animasyon")??u.get("hareket")??u.get("motion"),pH=location.pathname.indexOf("/animasyon")===0;if(qH==="0"||qH==="kapali"||qH==="varsayilan"){localStorage.removeItem("${HAREKET_KEY}");delete d.dataset.hareket}else if(pH||qH!==null||localStorage.getItem("${HAREKET_KEY}")==="acik"){d.dataset.hareket="acik";if(pH||qH!==null)localStorage.setItem("${HAREKET_KEY}","acik")}}catch(e){}`;

