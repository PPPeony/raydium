import BluePurplePanel from '@/components/BluePurplePanel';
import BPInnerPanel from '@/components/BPInnerPanel';
import ButtonWithBorder from '@/components/ButtonWithBorder';
import SwitchTabs from '@/components/SwitchTabs';

export default function HomePage() {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <div>
        <SwitchTabs></SwitchTabs>
      </div>
      <div>
        <BluePurplePanel>
          <div style={{ marginTop: '1.25rem' }}>
            <BPInnerPanel></BPInnerPanel>
          </div>
          <div>
            <div className=''>

            </div>
          </div>
          <div>
            <BPInnerPanel></BPInnerPanel>
          </div>
          <div>
            <ButtonWithBorder></ButtonWithBorder>
          </div>
        </BluePurplePanel>
      </div>
    </div>
  );
}
