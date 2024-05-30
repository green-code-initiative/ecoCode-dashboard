import IconNuclear from 'Icons/icon-nuclear.svg';
import IconBug from 'Icons/icon-bug.svg';
import IconLockUnlocked from 'Icons/icon-lock-unlocked.svg';

import IconSeverityMajor from 'Icons/icon-severity-major.svg';
import IconSeverityMinor from 'Icons/icon-severity-minor.svg';
import IconSeverityInfo from 'Icons/icon-severity-info.svg';
import IconSeverityCritical from 'Icons/icon-severity-critical.svg';
import IconSeverityBlocker from 'Icons/icon-severity-blocker.svg';

import iconCpu from 'Icons/icon-cpu.svg';
import iconRam from 'Icons/icon-ram.svg';
import iconNetwork from 'Icons/icon-network.svg';
import iconDisk from 'Icons/icon-storage.svg';
import iconMaintenance from 'Icons/icon-maintenance.svg';

export function getTypeLabelAndIcon(label) {
  // All svg of types. To add new type if necessary
  const typeLib = {
    CODE_SMELL: {
      label: 'Code Smell',
      icon: IconNuclear,
    },
    BUG: {
      label: 'Bug',
      icon: IconBug,
    },
    VULNERABILITY: {
      label: 'Vulnerability',
      icon: IconLockUnlocked,
    },
  };

  return typeLib[label];
}

export function getSeverityLabelAndIcon(label) {
  // All svg of severity. To add new type if necessary
  const severityLib = {
    MAJOR: {
      label: 'Medium',
      icon: IconSeverityMajor,
      class: 'impact medium',
    },
    MINOR: {
      label: 'Low',
      icon: IconSeverityMinor,
      class: 'impact low',
    },
    INFO: {
      label: 'Info',
      icon: IconSeverityInfo,
      class: 'impact info',
    },
    CRITICAL: {
      label: 'High',
      icon: IconSeverityCritical,
      class: 'impact high',
    },
    BLOCKER: {
      label: 'Blocker',
      icon: IconSeverityBlocker,
      class: 'impact blocker',
    },
  };

  return severityLib[label];
}

export function getRuleTagIcon(label) {
  const tagsLab = {
    cpu: {
      label: 'CPU',
      icon: iconCpu,
    },
    ram: {
      label: 'RAM',
      icon: iconRam,
    },
    network: {
      label: 'Network',
      icon: iconNetwork,
    },
    disk: {
      label: 'Disk',
      icon: iconDisk,
    },
    maintenance: {
      label: 'Maintenance',
      icon: iconMaintenance,
    },
  };

  return tagsLab[label];
}
