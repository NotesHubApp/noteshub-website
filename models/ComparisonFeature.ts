export type FeatureStatus = 'present' | 'absent'

export type Feature = {
  name: string
  hint?: string
  web: FeatureStatus
  iOS: FeatureStatus
  android: FeatureStatus
  windows: FeatureStatus
}
