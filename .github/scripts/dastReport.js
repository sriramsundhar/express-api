module.exports = async ({ github, context, core, eventName, data }) => {
  // 1. Prepare format of the comment
  const output = `#### DAST Scan 🖌
  <details><summary>Scan Output</summary>
    <br/>
    ${data}
  </details>`

  await core.summary.addRaw(output).write()
  if (eventName == 'pull_request') {
    // 2. Retrieve existing bot comments for the PR
    const { data: comments } = await github.rest.issues.listComments({
      owner: context.repo.owner,
      repo: context.repo.repo,
      issue_number: context.issue.number,
    })
    const botComment = comments.find((comment) => {
      return comment.user.type === 'Bot' && comment.body.includes('DAST Scan')
    })
    // 3. If we have a comment, update it, otherwise create a new one
    if (botComment) {
      github.rest.issues.updateComment({
        owner: context.repo.owner,
        repo: context.repo.repo,
        comment_id: botComment.id,
        body: output,
      })
    } else {
      github.rest.issues.createComment({
        issue_number: context.issue.number,
        owner: context.repo.owner,
        repo: context.repo.repo,
        body: output,
      })
    }
  }
}
