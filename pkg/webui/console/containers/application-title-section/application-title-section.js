// Copyright © 2020 The Things Network Foundation, The Things Industries B.V.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import React from 'react'

import applicationIcon from '@assets/misc/application.svg'

import Spinner from '@ttn-lw/components/spinner'
import Status from '@ttn-lw/components/status'

import Message from '@ttn-lw/lib/components/message'

import LastSeen from '@console/components/last-seen'
import EntityTitleSection from '@console/components/entity-title-section'

import sharedMessages from '@ttn-lw/lib/shared-messages'
import PropTypes from '@ttn-lw/lib/prop-types'

import style from './application-title-section.styl'

const { Content } = EntityTitleSection

const ApplicationTitleSection = props => {
  const {
    appId,
    fetching,
    application,
    apiKeysTotalCount,
    apiKeysErrored,
    collaboratorsTotalCount,
    collaboratorsErrored,
    devicesTotalCount,
    devicesErrored,
    lastSeen,
    mayViewCollaborators,
    mayViewApiKeys,
    mayViewDevices,
  } = props

  const showLastSeen = Boolean(lastSeen)

  return (
    <EntityTitleSection
      id={appId}
      name={application.name}
      icon={applicationIcon}
      iconAlt={sharedMessages.application}
    >
      <Content creationDate={application.created_at}>
        {fetching ? (
          <Spinner after={0} faded micro inline>
            <Message content={sharedMessages.fetching} />
          </Spinner>
        ) : (
          <>
            {showLastSeen ? (
              <Status status="good" className={style.lastSeen} flipped>
                <LastSeen lastSeen={lastSeen} />
              </Status>
            ) : (
              <Status
                status="mediocre"
                label={sharedMessages.lastSeenUnavailable}
                className={style.lastSeen}
                flipped
              />
            )}
            {mayViewDevices && (
              <Content.EntityCount
                icon="devices"
                value={devicesTotalCount}
                keyMessage={sharedMessages.deviceCounted}
                errored={devicesErrored}
                toAllUrl={`/applications/${appId}/devices`}
              />
            )}
            {mayViewCollaborators && (
              <Content.EntityCount
                icon="collaborators"
                value={collaboratorsTotalCount}
                keyMessage={sharedMessages.collaboratorCounted}
                errored={collaboratorsErrored}
                toAllUrl={`/applications/${appId}/collaborators`}
              />
            )}
            {mayViewApiKeys && (
              <Content.EntityCount
                icon="api_keys"
                value={apiKeysTotalCount}
                keyMessage={sharedMessages.apiKeyCounted}
                errored={apiKeysErrored}
                toAllUrl={`/applications/${appId}/api-keys`}
              />
            )}
          </>
        )}
      </Content>
    </EntityTitleSection>
  )
}

ApplicationTitleSection.propTypes = {
  apiKeysErrored: PropTypes.bool.isRequired,
  apiKeysTotalCount: PropTypes.number,
  appId: PropTypes.string.isRequired,
  application: PropTypes.application.isRequired,
  collaboratorsErrored: PropTypes.bool.isRequired,
  collaboratorsTotalCount: PropTypes.number,
  devicesErrored: PropTypes.bool.isRequired,
  devicesTotalCount: PropTypes.number,
  fetching: PropTypes.bool.isRequired,
  lastSeen: PropTypes.string,
  mayViewApiKeys: PropTypes.bool.isRequired,
  mayViewCollaborators: PropTypes.bool.isRequired,
  mayViewDevices: PropTypes.bool.isRequired,
}

ApplicationTitleSection.defaultProps = {
  apiKeysTotalCount: undefined,
  collaboratorsTotalCount: undefined,
  devicesTotalCount: undefined,
  lastSeen: undefined,
}

export default ApplicationTitleSection
