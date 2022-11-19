export default function Icon(pros: { src: string }) {
  return (
    <div className="sider-menuitem-icon" >
      <img src={require(`/src/assets/icons/entry-icon-${pros.src}.svg`)} />
    </div>
  );
}
