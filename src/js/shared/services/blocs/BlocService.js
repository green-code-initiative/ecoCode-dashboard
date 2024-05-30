import {
  findTreeStoreKey,
  totalAppCodeLinesStoreKey,
} from '../../common/storageKeys';
import Bloc from '../../models/Bloc';
import { getStoredData } from '../../storage/DataStorage';

export default class BlocService {
  async build() {
    const tree = await getStoredData(findTreeStoreKey);
    const { root } = tree;
    const totalLines = await getStoredData(totalAppCodeLinesStoreKey);
    const blocs = [];
    await this.tree(blocs, root, totalLines);

    return blocs;
  }

  async tree(blocs, node, totalLines) {
    // console.log("children", node);
    if (node != null) {
      for (let index = 0; index < node.children.length; index += 1) {
        const child = node.children[index];

        if (
          child.component.qualifier === 'DIR' &&
          child.children !== undefined
        ) {
          let childrenMinorSeverities = 0;
          let childrenMajorSeverities = 0;
          let childrenCriticalSeverities = 0;
          let childrenBlockerSeverities = 0;
          let shouldBuild = false;
          child.children.forEach((subChild) => {
            if (subChild.component.qualifier === 'FIL') {
              childrenMinorSeverities += subChild.minorSeverities.length;
              childrenMajorSeverities += subChild.majorSeverities.length;
              childrenCriticalSeverities += subChild.criticalSeverities.length;
              childrenBlockerSeverities += subChild.blockerSeverities.length;
              shouldBuild = true;
            }
          });
          if (shouldBuild) {
            child.directMinorSeverities = childrenMinorSeverities;
            child.directMajorSeverities = childrenMajorSeverities;
            child.directCriticalSeverities = childrenCriticalSeverities;
            child.directBlockerSeverities = childrenBlockerSeverities;
            const bloc = await BlocService.buildBloc(child, totalLines);
            blocs.push(bloc);
          }

          await this.tree(blocs, child, totalLines);
        }
      }
    }
  }

  static async buildBloc(child, totalLines) {
    const { component } = child;

    const bloc = new Bloc();
    bloc.key = component.key;
    bloc.blocName = component.name;
    bloc.path = component.path;
    bloc.numberOfErrors = 0;
    bloc.numberOfLines = child.numberOfLines;
    bloc.numberOfDirectErrors =
      child.directMinorSeverities +
      child.directMajorSeverities +
      child.directCriticalSeverities +
      child.directBlockerSeverities;

    bloc.blocSize = BlocService.calculateSize(
      parseFloat(bloc.numberOfLines) / parseFloat(totalLines),
    );

    let style = {
      color: '#BBBBBB',
      blocType: 'not-covered',
    };

    style = await BlocService.generateStyle(child);
    bloc.color = style.color;
    bloc.blocType = style.blocType;
    bloc.minorIssues = style.minorIssues;
    bloc.majorIssues = style.majorIssues;
    bloc.criticalIssues = style.criticalIssues;

    if (bloc.majorIssues && bloc.minorIssues && bloc.criticalIssues) {
      bloc.numberOfErrors =
        bloc.minorIssues.length +
        bloc.majorIssues.length +
        bloc.criticalIssues.length;
    }

    return bloc;
  }

  static async generateStyle(component) {
    const style = {
      color: '',
      blocType: '',
      minorIssues: [],
      majorIssues: [],
      criticalIssues: [],
    };

    const { minorSeverities } = component;
    const { majorSeverities } = component;
    const { blockerSeverities } = component;
    const { criticalSeverities } = component;

    style.minorIssues = minorSeverities;
    style.majorIssues = majorSeverities;
    style.criticalIssues = criticalSeverities;

    if (
      minorSeverities.length === 0 &&
      majorSeverities.length === 0 &&
      criticalSeverities.length === 0 &&
      blockerSeverities.length === 0
    ) {
      style.color = '#85BB2F';
      style.blocType = 'optimized';
    }
    if (minorSeverities.length >= 1 && minorSeverities.length <= 9) {
      style.color = '#FECB02';
      style.blocType = 'low-impact';
    }
    if (
      (minorSeverities.length >= 10 && minorSeverities.length <= 19) ||
      majorSeverities.length >= 1
    ) {
      style.color = '#FF8E12';
      style.blocType = 'medium-impact';
    }
    if (
      minorSeverities.length >= 20 ||
      majorSeverities.length >= 10 ||
      criticalSeverities.length >= 1
    ) {
      style.color = '#E30021';
      style.blocType = 'high-impact';
    }

    return style;
  }

  static calculateSize(value) {
    if (value >= 0 && value <= 0.2) {
      return 15;
    }
    if (value >= 0.21 && value <= 0.4) {
      return 25;
    }
    if (value >= 0.41 && value <= 0.6) {
      return 35;
    }
    if (value >= 0.61 && value <= 0.8) {
      return 45;
    }
    if (value >= 0.81 && value <= 1) {
      return 55;
    }
    return 0;
  }
}
