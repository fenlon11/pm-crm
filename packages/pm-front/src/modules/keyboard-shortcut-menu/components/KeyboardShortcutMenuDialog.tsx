import {
  StyledContainer,
  StyledDialog,
  StyledHeading,
} from './KeyboardShortcutMenuStyles';
import { t } from '@lingui/core/macro';
import { IconButton } from 'pm-ui/input';
import { IconX } from 'pm-ui/display';
import { useIsMobile } from 'pm-ui/utilities';

type KeyboardMenuDialogProps = {
  onClose: () => void;
  children: React.ReactNode | React.ReactNode[];
};

export const KeyboardMenuDialog = ({
  onClose,
  children,
}: KeyboardMenuDialogProps) => {
  const isMobile = useIsMobile();

  return (
    <StyledDialog isMobile={isMobile}>
      <StyledHeading>
        {t`Keyboard shortcuts`}
        <IconButton variant="tertiary" Icon={IconX} onClick={onClose} />
      </StyledHeading>
      <StyledContainer>{children}</StyledContainer>
    </StyledDialog>
  );
};
