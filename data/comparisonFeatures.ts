import { ComparisonFeatureModel } from 'models/ComparisonFeatureModel';

const features: ComparisonFeatureModel[] = [
  {
    name: 'Git notebooks',
    web: 'present',
    iOS: 'present',
    android: 'present',
    windows: 'present'
  },
  {
    name: 'GitHub notebooks',
    web: 'present',
    iOS: 'present',
    android: 'present',
    windows: 'present'
  },
  {
    name: 'Large Git/GitHub notebooks',
    hint: 'Large notebooks are considered with a size of more than 5MB',
    web: 'absent',
    iOS: 'present',
    android: 'present',
    windows: 'present'
  },
  {
    name: 'File System notebooks',
    web: 'present',
    iOS: 'absent',
    android: 'present',
    windows: 'present'
  },
  {
    name: 'iCloud Drive notebooks',
    web: 'absent',
    iOS: 'present',
    android: 'absent',
    windows: 'absent'
  },
  {
    name: 'Native app experience',
    hint: 'Better dark theme support, enhanced security, system-level integration, and more...',
    web: 'absent',
    iOS: 'present',
    android: 'present',
    windows: 'present'
  },
  {
    name: 'More frequent data sync',
    web: 'absent',
    iOS: 'present',
    android: 'present',
    windows: 'present'
  }
]

export default features;
