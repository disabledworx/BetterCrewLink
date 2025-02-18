import React, { useState, useEffect } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { DialogContent, DialogTitle, DialogActions, Dialog, Button, TextField } from '@material-ui/core';
import languages from '../language/languages';
import { ILobbySettings } from '../../common/ISettings';
import Alert from '@material-ui/lab/Alert';
import { modList } from '../../common/PublicLobby';

type publicLobbySettingProps = {
	t: (key: string) => string;
	updateSetting: (setting: string, newValue: any) => void;
	lobbySettings: ILobbySettings;
	canChange: boolean;
	className: string;
};

const useStyles = makeStyles(() => ({
	specialButton: {
		width: '100%',
		marginLeft: '-11px',
		borderTop: '1px solid #313135',
		backgroundColor: 'rgba(0,0,0,0.03)',
	},
}));
const PublicLobbySettings: React.FC<publicLobbySettingProps> = function ({
	t,
	lobbySettings,
	updateSetting,
	canChange,
	className,
}: publicLobbySettingProps) {
	const [open, setOpen] = useState(false);
	const classes = useStyles();
	useEffect(() => {
		setLobbySettingState(lobbySettings);
	}, [lobbySettings]);

	const [lobbySettingState, setLobbySettingState] = useState(lobbySettings);

	return (
		<>
			<Button variant="text" className={classes.specialButton} onClick={() => setOpen(true)}>
				{t('settings.lobbysettings.public_lobby.change_settings')}
			</Button>
			<Dialog fullScreen open={open} onClose={() => setOpen(false)}>
				<DialogTitle>{t('settings.lobbysettings.public_lobby.change_settings')}</DialogTitle>
				<DialogContent className={className}>
					<TextField
						fullWidth
						spellCheck={false}
						label={t('settings.lobbysettings.public_lobby.title')}
						value={lobbySettingState.publicLobby_title}
						onChange={(ev) => setLobbySettingState({ ...lobbySettingState, publicLobby_title: ev.target.value })}
						onBlur={(ev) => updateSetting('publicLobby_title', ev.target.value)}
						variant="outlined"
						color="primary"
						disabled={!canChange}
					/>
					<TextField
						fullWidth
						select
						label={t('settings.lobbysettings.public_lobby.language')}
						variant="outlined"
						color="secondary"
						SelectProps={{ native: true }}
						InputLabelProps={{ shrink: true }}
						value={lobbySettingState.publicLobby_language}
						onChange={(ev) => setLobbySettingState({ ...lobbySettingState, publicLobby_language: ev.target.value })}
						onBlur={(ev) => updateSetting('publicLobby_language', ev.target.value)}
						disabled={!canChange}
					>
						{Object.entries(languages).map(([key, value]) => (
							<option key={key} value={key}>
								{value.name}
							</option>
						))}
					</TextField>
					<TextField
						fullWidth
						select
						label={t('settings.lobbysettings.public_lobby.mods')}
						variant="outlined"
						color="secondary"
						SelectProps={{ native: true }}
						InputLabelProps={{ shrink: true }}
						value={lobbySettingState.publicLobby_mods}
						onChange={(ev) => setLobbySettingState({ ...lobbySettingState, publicLobby_mods: ev.target.value })}
						onBlur={(ev) => updateSetting('publicLobby_mods', ev.target.value)}
						disabled={!canChange}
					>
						{modList.map((d) => (
							<option key={d.id} value={d.id}>
								{d.label}
							</option>
						))}
					</TextField>
					<Alert severity="error">{t('settings.lobbysettings.public_lobby.ban_warning')}</Alert>
				</DialogContent>
				<DialogActions>
					<Button
						color="primary"
						onClick={() => {
							setOpen(false);
						}}
					>
						{t('buttons.confirm')}
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default PublicLobbySettings;
