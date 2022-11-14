import BluePurplePanel from '@/components/BluePurplePanel';
import BPInnerPanel from '@/components/BPInnerPanel';
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
            <BPInnerPanel></BPInnerPanel>
          </div>
        </BluePurplePanel>
      </div>
    </div>
  );
}
