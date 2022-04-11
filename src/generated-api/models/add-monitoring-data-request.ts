/* tslint:disable */

/**
 * Запрос на добавление данных мониторинга
 */
export interface AddMonitoringDataRequest {

  /**
   * Идентификатор устройства.
   */
  id?: string;

  /**
   * Имя узла / пользователя
   */
  nodeName?: string;

  /**
   * Наименование операционной системы
   */
  operatingSystem?: string;

  /**
   * Версия клиента
   */
  version?: string;
}
