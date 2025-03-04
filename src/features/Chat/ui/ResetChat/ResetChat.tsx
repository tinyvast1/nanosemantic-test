import { Button, EButtonVariant } from '@/shared/ui';
import IconUpdate from '@/shared/assets/update.svg';
import { useChatBotContext } from '@/entities/Chat';

const ResetChat = () => {
  const { resetChat } = useChatBotContext();

  return (
    <Button variant={EButtonVariant.FIELD} onClick={resetChat}>
      <img width={30} src={IconUpdate} alt="" />
    </Button>
  );
};

export default ResetChat;

