import React from "react";
export default function Icon(pros: {src: string}) {
  return (
  <div className="sider-menuitem-icon" style={{display:'grid',padding: 6, backgroundColor: 'white', borderRadius: '0.5rem'}}>
      <img src={require(`/src/assets/icons/entry-icon-${pros.src}.svg`)}/>
  </div>)
}