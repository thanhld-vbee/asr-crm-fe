export const ORDER_BY = [
  { label: 'increase', value: 'increase' },
  { label: 'decrease', value: 'decrease' },
];

export const VOICE_CRITERIA_SORT = [
  { label: 'latestVoice', value: 'latest' },
  { label: 'mostPopular', value: 'popular' },
  { label: 'favorite', value: 'favorite' },
];

export const GENDER = [
  { value: 'female', label: 'female' },
  { value: 'male', label: 'male' },
];

export const VOICE_TONE = [
  { label: 'low', value: 'low' },
  { label: 'middle', value: 'middle' },
  { label: 'hight', value: 'hight' },
];

export const VOICE_DOMAIN = [
  { label: 'review', value: 'review' },
  { label: 'hotTrend', value: 'trend' },
  { label: 'chronicle', value: 'chronicle' },
  { label: 'news', value: 'news' },
  { label: 'commentary', value: 'commentary' },
  { label: 'demonstration', value: 'demonstration' },
];

export const VOICE_FEATURE = [
  { label: 'seriously', value: 'seriously' },
  { label: 'happy', value: 'happy' },
  { label: 'friendly', value: 'friendly' },
  { label: 'quiet', value: 'quiet' },
  { label: 'humorous', value: 'humorous' },
  { label: 'mysterious', value: 'mysterious' },
];

export const BREAK_TIME = [0.5, 1, 2, 3];

export const SPEED = [
  { value: 0.1, title: 'verySlow' },
  { value: 0.5, title: 'slow' },
  { value: 0.75, title: 'slower' },
  { value: 1, title: 'normal' },
  { value: 1.25, title: 'faster' },
  { value: 1.5, title: 'fast' },
  { value: 2, title: 'veryFast' },
];

export const AUDIO_TYPE = ['mp3', 'wav'];

export const BITRATE = [8, 16, 32, 64, 128];

export const DEFAULT_BREAK_TIME = 1;

export const DEFAULT_SPEED = 1;

export const DEFAULT_SYNTHESIS_REQUEST = {
  title: '',
  breakTime: 0.5,
  speed: 1,
  audioType: 'wav',
  bitrate: 128,
  volume: 100,
  backgroundMusic: { volume: 80 },
};

export const REQUEST_STATUS = {
  IN_PROGRESS: 'IN_PROGRESS',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
};

export const AUDIO_FILE_FORMAT = ['mp3', 'wav'];

export const TEXT_FILE_FORMAT = ['doc', 'docx', 'txt'];

export const LANGUAGE_CODE = { VIETNAMESE: 'vi-VN' };

export const MAX_TRY_LISTENING_CHARACTERS = 2000;

export const VOICE_PAGINATION_LIMIT = 12;

export const BREAK_TIME_REGEX = /[<]break\s+time[=]([0-9.]+)[s][/][>]/g;

export const VIETNAMESE_LETTERS =
  'ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ';

export const TTS_ATTRIBUTE = {
  EMPHASIS: 'emphasis',
  PITCH: 'pitch',
  SPEED: 'speed',
};
