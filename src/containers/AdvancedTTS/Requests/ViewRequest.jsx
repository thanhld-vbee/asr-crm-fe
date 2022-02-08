import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import Dialog from '@src/components/Dialog';
import CopyableButton from '@src/components/CopyableButton';
import apis from '@src/apis';

import { StyledViewRequest } from './index.style';

const ViewParagraphContent = ({ content }) => {
  const { t } = useTranslation();

  return (
    <div className="view-paragraph-content">
      <Typography className="content">{t('content')}</Typography>
      <Typography>{content}</Typography>
    </div>
  );
};

const ViewSentenceContent = ({ sentences }) => {
  const { t } = useTranslation();

  return (
    <div className="view-sentence-content">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className="header-cell">
              {t('sentenceContent')}
            </TableCell>
            <TableCell className="header-cell" align="right">
              {t('numberCharacters')}
            </TableCell>
            <TableCell className="header-cell" align="right">
              {t('speed')}
            </TableCell>
            <TableCell className="header-cell" align="right">
              {t('voice')}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sentences?.length &&
            sentences.map((row) => (
              <TableRow
                key={row.text}
                sx={{ '&:last-child td': { border: '0 !important' } }}
              >
                <TableCell className="content-col" width="55%" scope="row">
                  {row.text}
                </TableCell>
                <TableCell align="right" width="15%">
                  {row.characters}
                </TableCell>
                <TableCell align="right" width="15%">
                  {row.speed}x
                </TableCell>
                <TableCell align="right" width="15%">
                  {row.voice?.name}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

const ViewRequest = ({ open, requestId, onClose }) => {
  const { t } = useTranslation();
  const [request, setRequest] = useState({});

  const fetchRequest = async () => {
    const data = await apis.requests.getRequest(requestId);
    if (data.status) setRequest(data.result);
  };

  useEffect(() => {
    if (open) fetchRequest();
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg">
      <StyledViewRequest>
        <div className="header">
          <Typography className="header-title">{t('information')}</Typography>
        </div>
        <div className="information-wrapper">
          <div className="information-column">
            <Typography className="title">{t('id')}</Typography>
            <div className="request-id">
              <Typography>{request?.id}</Typography>
              <CopyableButton content={request?.id} />
            </div>
            <Typography className="title">{t('title')}</Typography>
            <Typography>{request?.title}</Typography>
            <Typography className="title">{t('numberCharacters')}</Typography>
            <Typography>{request?.characters}</Typography>
            {request?.speed && (
              <>
                <Typography className="title">{t('speed')}</Typography>
                <Typography>{request?.speed}x</Typography>
              </>
            )}
            <Typography className="title">{t('bitrate')}</Typography>
            <Typography>{`${request?.bitrate / 1000 || 0} kbps`}</Typography>
          </div>
          <div className="information-column">
            {request?.text && (
              <>
                <Typography className="title">{t('voice')}</Typography>
                <Typography>{request?.text && request?.voice?.name}</Typography>
              </>
            )}
            <Typography className="title">{t('backgroundMusic')}</Typography>
            <Typography>
              {request?.backgroundMusic?.link
                ? request.backgroundMusic.name || t('yesValue')
                : t('noValue')}
            </Typography>
            {request?.backgroundMusic?.link && (
              <>
                <Typography className="title">
                  {t('backgroundMusicVolume')}
                </Typography>
                <Typography>
                  {`${request?.backgroundMusic?.volume}%`}
                </Typography>
              </>
            )}
            <Typography className="title">{t('volume')}</Typography>
            <Typography>{`${request?.volume || 100}%`}</Typography>
            <Typography className="title">{t('audioType')}</Typography>
            <Typography>{request?.audioType}</Typography>
          </div>
        </div>
        <div className="request-content">
          {request?.text ? (
            <ViewParagraphContent content={request?.text} />
          ) : (
            <ViewSentenceContent sentences={request?.sentences} />
          )}
        </div>
      </StyledViewRequest>
    </Dialog>
  );
};
export default ViewRequest;
