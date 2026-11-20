# Manual testing handoff plan

Scope: replace required automated browser checks with Marlon's manual UI testing while keeping automated code checks and truthful outcomes.

- Verification runs formatting, TypeScript, unit tests and build without launching browsers; a successful receipt identifies code checks only.
- The agent supplies a specific manual checklist and sends completed implementation to Pending test; failed code checks block the handoff. Human results are recorded before PR-ready status.
- Update cloud setup, CI, agent guidance and testing instructions consistently. Keep existing browser tests available but do not run them.
- Check the verification receipt, CI configuration and documentation, and run the non-browser verification suite. Linear routing and Slack outcomes require a separate live pilot.
