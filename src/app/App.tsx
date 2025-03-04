import { Chat } from '@/widgets/Chat';

const App = () => {
  return <Chat uuid={import.meta.env.VITE_CHAT_BOT_UUID} />;
};

export default App;

