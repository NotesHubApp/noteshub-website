import { ComparisonFeatureModel } from 'models/ComparisonFeatureModel';

const features: ComparisonFeatureModel[] = [
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
  },
  {
    name: 'Native app experience',
    hint: 'Better dark theme support, enhanced security, system-level integration, and more...',
    web: 'absent',
    iOS: 'present',
    android: 'present',
    windows: 'present'
  }
]

export default features;
