// Narrator presets for Discovery Video generation.
// thumbnailUrl and previewAudioUrl will be populated in Phase 2 (ElevenLabs integration).
// elevenLabsVoiceId maps to the ElevenLabs voice used for TTS rendering.

export type NarratorPreset = {
  id: string;
  name: string;
  gender: 'male' | 'female';
  elevenLabsVoiceId: string;
  description: string;
  thumbnailUrl: string;
  previewAudioUrl: string;
};

export const NARRATOR_PRESETS: NarratorPreset[] = [
  {
    id: 'marcus',
    name: 'Marcus',
    gender: 'male',
    elevenLabsVoiceId: 'pNInz6obpgDQGcFmaJgB', // ElevenLabs "Adam" — deep, authoritative
    description: 'Deep, authoritative executive',
    thumbnailUrl: '',
    previewAudioUrl: '',
  },
  {
    id: 'james',
    name: 'James',
    gender: 'male',
    elevenLabsVoiceId: 'TxGEqnHWrfWFTfGW9XjX', // ElevenLabs "Josh" — conversational professional
    description: 'Smooth, conversational professional',
    thumbnailUrl: '',
    previewAudioUrl: '',
  },
  {
    id: 'sarah',
    name: 'Sarah',
    gender: 'female',
    elevenLabsVoiceId: 'EXAVITQu4vr4xnSDxMaL', // ElevenLabs "Bella" — warm, friendly
    description: 'Warm, friendly recruiter',
    thumbnailUrl: '',
    previewAudioUrl: '',
  },
  {
    id: 'elena',
    name: 'Elena',
    gender: 'female',
    elevenLabsVoiceId: 'MF3mGyEYCl7XYWbV9V6O', // ElevenLabs "Elli" — bright, engaging
    description: 'Bright, engaging presenter',
    thumbnailUrl: '',
    previewAudioUrl: '',
  },
  {
    id: 'alex',
    name: 'Alex',
    gender: 'female',
    elevenLabsVoiceId: 'AZnzlk1XvdvUeBnXmlld', // ElevenLabs "Domi" — neutral, balanced
    description: 'Neutral, balanced advisor',
    thumbnailUrl: '',
    previewAudioUrl: '',
  },
];

export const DEFAULT_NARRATOR_ID = 'sarah';

export function getNarratorById(id: string): NarratorPreset | undefined {
  return NARRATOR_PRESETS.find((n) => n.id === id);
}

export function getNarratorOrDefault(id: string | undefined): NarratorPreset {
  return getNarratorById(id ?? DEFAULT_NARRATOR_ID) ?? NARRATOR_PRESETS[0];
}
