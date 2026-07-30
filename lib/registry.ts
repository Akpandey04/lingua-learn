import { ComponentType } from 'react';
import type { LearningModule } from '@/types/domain';

export interface ModuleProps<T extends LearningModule = LearningModule> {
  module: T;
  onComplete: () => void;
}

class ModuleRegistry {
  private renderers = new Map<string, ComponentType<any>>();

  register<T extends LearningModule>(type: T['type'], component: ComponentType<ModuleProps<T>>) {
    this.renderers.set(type, component);
  }

  get(type: string): ComponentType<any> | undefined {
    return this.renderers.get(type);
  }
}

export const moduleRegistry = new ModuleRegistry();
