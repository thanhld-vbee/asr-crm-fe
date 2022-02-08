import React, { useEffect, useState } from 'react';
import { Box, Tooltip } from '@mui/material';
import { Check, ContentCopy } from '@mui/icons-material';

import { StyledCopyableButton } from './index.style';

const CopyableButton = ({ content }) => {
  const [copied, setCopied] = useState(false);

  const handleClickCopy = () => {
    if (content) {
      navigator.clipboard.writeText(content);
      setCopied(true);
    }
  };

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 3000);
    }
  }, [copied]);

  return (
    <StyledCopyableButton>
      {!copied && (
        <Box onClick={handleClickCopy}>
          <ContentCopy className="copy" />
        </Box>
      )}
      {copied && (
        <Box>
          <Tooltip title={copied ? 'Copied' : ''} placement="right">
            <Check className="check" />
          </Tooltip>
        </Box>
      )}
    </StyledCopyableButton>
  );
};

export default CopyableButton;
