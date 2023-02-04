import { Feature } from '../models/ComparisonFeature';

const features: Feature[] = [
  {
    name: 'Git Notebooks',
    web: 'present',
    iOS: 'present',
    android: 'present',
    windows: 'present'
  },
  {
    name: 'GitHub Notebooks',
    web: 'present',
    iOS: 'present',
    android: 'present',
    windows: 'present'
  },
  {
    name: 'Large Git/GitHub Notebooks',
    hint: 'Large notebooks are considered with a size of more than 5MB',
    web: 'absent',
    iOS: 'present',
    android: 'present',
    windows: 'present'
  },
  {
    name: 'File System Notebooks',
    web: 'present',
    iOS: 'absent',
    android: 'absent',
    windows: 'present'
  },
  {
    name: 'iCloud Drive Notebooks',
    web: 'absent',
    iOS: 'present',
    android: 'absent',
    windows: 'absent'
  }
]

export default features;
